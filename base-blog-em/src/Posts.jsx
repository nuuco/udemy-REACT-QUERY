import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const {data, isLoading, isError, error} = useQuery("posts", fetchPosts, { staleTime: 5000, cacheTime: 60000 });
  //useQuery(쿼리 키, 쿼리 함수)
  //1. 쿼리 키 : 쿼리 이름
  //2. 쿼리 함수 : 이 쿼리에 대한 데이터를 가져오는 함수. 비동기 함수
  //data에 fetchPosts 함수가 리턴하는 값이 담긴다.

  if(isLoading) return <h3>Loading...</h3>;
  if(isError) return (
    <>
      <h3>Oops, something went wrong.</h3>
      <p>{error.toString()}</p>
    </>
  )

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
