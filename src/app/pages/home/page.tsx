'use client';
import React, { useContext, useRef, useState } from 'react';
import Nav from '../../components/Navigation';
import Post from '../../components/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { postServices } from '@/app/api/post/postApi';
// import { UserContext } from '@/app/providers';
// import { UserContextType } from '@/app/types';
import { useMutation, useQueryClient } from 'react-query';
import { UserContext } from '@/app/providers';
import { UserContextProps } from '@/app/types';
import Friends from '@/app/components/Friends';
import Others from '@/app/components/Others';

export default function Home() {
  const [post, setPost] = useState<string | null>('');
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { user, setUser } = useContext(UserContext) as UserContextProps;

  const createPostMutation = useMutation(
    (inputPostValue: string) =>
      postServices.createPost(user?.data._id, inputPostValue),
    {
      onSuccess: () => {
        if (post) {
          setPost('');
        }
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handlePost() {
    if (!post) return alert('Type something');

    createPostMutation.mutate(post);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />

      {/* Main Content */}
      <div className="container mx-auto mt-8 flex space-x-8">
        {/* Friends Section */}
        <Friends />

        {/* Posts Feed */}
        <div className="w-1/2">
          {/* Post Input */}
          <div className="mb-6 bg-white p-4 rounded shadow-md">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="What's on your mind?"
              onChange={(e) => setPost(e.target.value)}
              value={post}
            ></textarea>
            <div className="flex items-center justify-between mt-2">
              {/* upload image */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <FontAwesomeIcon icon={faImage} className="text-indigo-600" />
                <span className="text-indigo-600 text-xs">Upload Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                />
              </label>
              <button
                className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                onClick={() => handlePost()}
              >
                Post
              </button>
            </div>
          </div>

          <Post />
        </div>

        <Others />
      </div>
    </div>
  );
}
