'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

interface BlogPost {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

export function BlogSection() {
  const { translate } = useLanguage();
  const blogTitle = translate('blog.title');
  const readPostText = translate('blog.readPost');
  // Aserción de tipo para asegurar que posts es un array de BlogPost
  const posts = translate('blog.posts') as BlogPost[];

  return (
    <section id="blog" className="pt-0 md:pt-0 lg:pt-0 pb-12 md:pb-24 lg:pb-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10">
          {blogTitle}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a 
              key={post.title} 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full"
            >
              <Card className="flex flex-col h-full bg-card/50 hover:bg-card/90 transition-colors duration-300">
                <CardHeader className="p-0">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={`Image for ${post.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{post.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">
                    {post.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
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
          ))}
        </div>
      </div>
    </section>
  );
}
