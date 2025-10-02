'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BlogPost } from '@/lib/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useEffect } from 'react';
import { useLanguage } from '@/context/language-context';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  url: z.string().url('Must be a valid URL'),
  tags: z.string().transform((val) => val.split(',').map(tag => tag.trim()).filter(Boolean)),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface BlogFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPost;
  userId?: string | null;
}

export function BlogFormDialog({ isOpen, onClose, post, userId }: BlogFormDialogProps) {
  const firestore = useFirestore();
  const { translate } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        url: post.url,
        tags: post.tags.join(', '),
      });
    } else {
      reset({ title: '', content: '', imageUrl: '', url: '', tags: '' });
    }
  }, [post, reset]);

  const onSubmit: SubmitHandler<BlogPostFormData> = (data) => {
    if (!userId) {
        alert('You must be logged in to create or edit a post.');
        return;
    }
    
    const postData = {
      ...data,
      authorId: userId,
      lastModifiedDate: serverTimestamp(),
    };

    if (post) {
      const docRef = doc(firestore, 'blogPosts', post.id);
      setDoc(docRef, {
        ...postData,
        publicationDate: post.publicationDate,
      }, { merge: true }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: postData,
        }));
      });
    } else {
      const colRef = collection(firestore, 'blogPosts');
      const newPostData = {
        ...postData,
        publicationDate: serverTimestamp(),
      };
      addDoc(colRef, newPostData).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: colRef.path,
            operation: 'create',
            requestResourceData: newPostData,
        }));
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{post ? translate('admin.form.editTitle') : translate('admin.form.newTitle')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">{translate('admin.form.titleLabel')}</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">{translate('admin.form.contentLabel')}</Label>
            <Textarea id="content" {...register('content')} className="min-h-[150px]" />
            {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">{translate('admin.form.imageUrlLabel')}</Label>
            <Input id="imageUrl" {...register('imageUrl')} />
            {errors.imageUrl && <p className="text-red-500 text-xs">{errors.imageUrl.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...register('url')} />
            {errors.url && <p className="text-red-500 text-xs">{errors.url.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">{translate('admin.form.tagsLabel')}</Label>
            <Input id="tags" {...register('tags')} placeholder={translate('admin.form.tagsPlaceholder')} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">{translate('admin.form.cancelButton')}</Button>
            </DialogClose>
            <Button type="submit">{translate('admin.form.saveButton')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
