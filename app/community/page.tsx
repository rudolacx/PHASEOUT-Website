"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PostWrite from "@/components/PostWrite";


type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};



export default function Community(){

  const [posts,setPosts] = useState<Post[]>([]);
  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadPosts();

  },[]);



  async function loadPosts(){


    const {data,error}=await supabase

      .from("posts")

      .select("*")

      .order("created_at",{
        ascending:false
      });



    if(error){

      console.log(error.message);
      return;

    }



    setPosts(data || []);

    setLoading(false);


  }



  return(

    <main className="min-h-screen bg-black text-white p-10">


      {/* Header */}

      <section>

        <h1 className="text-5xl font-bold">
          PHASEOUT COMMUNITY
        </h1>

        <p className="text-gray-400 mt-3">
          PHASEOUT 팬들과 함께하는 커뮤니티
        </p>


      </section>



      {/* 글 작성 */}

      <section className="mt-10">

        <PostWrite onPosted={loadPosts} />

      </section>




      {/* 게시글 목록 */}

      <section className="mt-10">


        <h2 className="text-3xl font-bold mb-5">
          최신 게시글
        </h2>



        {
          loading ? (

            <p>
              불러오는 중...
            </p>


          ) : posts.length === 0 ? (


            <div className="bg-zinc-900 p-5 rounded">

              아직 게시글이 없습니다.

            </div>


          ) : (


            <div className="space-y-5">


              {
                posts.map((post)=>(


                  <article

                  key={post.id}

                  className="bg-zinc-900 p-6 rounded-xl"

                  >


                    <h3 className="text-2xl font-bold">

                      {post.title}

                    </h3>



                    <p className="mt-3 text-gray-300">

                      {post.content}

                    </p>



                    <p className="text-sm text-gray-500 mt-5">

                      {new Date(post.created_at)
                      .toLocaleString()}

                    </p>



                  </article>


                ))
              }


            </div>


          )

        }


      </section>


    </main>

  );


}
