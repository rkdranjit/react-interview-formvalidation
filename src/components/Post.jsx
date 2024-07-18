import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const responseData = await response.json();
        const data = responseData.data; // Assuming your API response is { data: [...] }

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Invalid data format:", responseData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold">Posts</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="overflow-hidden rounded-lg bg-white shadow-md">
            <img src={post.image} alt={post.writeup} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={post.avatar}
                    alt={`${post.firstName} ${post.lastName}`}
                    className="mr-2 h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{`${post.firstName} ${post.lastName}`}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{post.writeup}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
