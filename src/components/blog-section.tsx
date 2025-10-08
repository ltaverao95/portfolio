"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Inbox } from "lucide-react";

import { BlogPost } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";
import axiosHttp from "@/lib/http/axios-http-handler";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

export function BlogSection() {
  const { language, translate } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const blogTitle = translate("blog.title") as string;
  const readPostText = translate("blog.readPost") as string;

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosHttp.get<BlogPost[]>(`/blogs`);
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="pt-0 md:pt-0 lg:pt-0 pb-12 md:pb-24 lg:pb-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10">
          {blogTitle}
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : !blogPosts || blogPosts.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            <Inbox className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-primary">
              {translate("blog.noPosts.title") as string}
            </h3>
            <p className="mt-2 text-base">
              {translate("blog.noPosts.description") as string}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts?.map((post) => {
              const title =
                post.title[language] || post.title[post.defaultLanguage];
              const content =
                post.content[language] || post.content[post.defaultLanguage];
              return (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  onClick={() => {
                    sendGAEvent("event", "blogPostClicked", {
                      postId: post.id,
                    });
                    sendGTMEvent({
                      event: "blogPostClicked",
                      value: post.id,
                    });
                  }}
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full"
                >
                  <Card className="flex flex-col h-full bg-card/50 hover:bg-card/90 transition-colors duration-300">
                    <CardHeader className="p-0">
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={`Image for ${title}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-6">
                      <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mb-4">
                        {content}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 mt-auto">
                      <div className="flex items-center text-primary font-semibold">
                        {readPostText}
                        <ArrowUpRight className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </CardFooter>
                  </Card>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
