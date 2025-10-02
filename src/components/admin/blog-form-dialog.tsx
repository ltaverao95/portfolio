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
import { BlogPost, LocalizedString } from '@/lib/types';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
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
import { PlusCircle, Trash2 } from 'lucide-react';

// Representa un par de traducción para el formulario
type TranslationField = {
  lang: string;
  title: string;
  content: string;
};

// Form data shape
type BlogPostFormData = {
  translations: TranslationField[];
  imageUrl: string;
  url: string;
  tags: string;
};

interface BlogFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPost;
  userId?: string | null;
  onMutation: (isMutating: boolean) => void;
}

export function BlogFormDialog({ isOpen, onClose, post, userId, onMutation }: BlogFormDialogProps) {
  const firestore = useFirestore();
  const { language: currentAppLanguage, translate } = useLanguage();
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormData>({
    defaultValues: {
      translations: [{ lang: currentAppLanguage, title: '', content: '' }],
      imageUrl: '',
      url: '',
      tags: '',
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'translations',
  });

  useEffect(() => {
    if (isOpen) {
        if (post) {
        const postTranslations: TranslationField[] = Object.keys(post.title).map(lang => ({
            lang,
            title: post.title[lang],
            content: post.content[lang],
        }));
        replace(postTranslations);
        reset({
            imageUrl: post.imageUrl,
            url: post.url,
            tags: post.tags.join(', '),
            translations: postTranslations,
        });
        } else {
        const defaultTranslation = [{ lang: currentAppLanguage, title: '', content: '' }];
        replace(defaultTranslation);
        reset({
            imageUrl: '',
            url: '',
            tags: '',
            translations: defaultTranslation,
        });
        }
    }
  }, [post, isOpen, reset, currentAppLanguage, replace]);

  const handleAddLanguage = () => {
    const existingLangs = fields.map(f => f.lang);
    if (!existingLangs.includes('en') && 'en' !== currentAppLanguage) {
      append({ lang: 'en', title: '', content: '' });
    } else if (!existingLangs.includes('es') && 'es' !== currentAppLanguage) {
      append({ lang: 'es', title: '', content: '' });
    }
  };

  const onSubmit: SubmitHandler<BlogPostFormData> = async (data) => {
    if (!userId) {
      alert('You must be logged in to create or edit a post.');
      return;
    }
    
    onMutation(true);

    const title: LocalizedString = {};
    const content: LocalizedString = {};
    data.translations.forEach(t => {
      title[t.lang] = t.title;
      content[t.lang] = t.content;
    });

    const postData: Omit<BlogPost, 'id' | 'publicationDate'> = {
      title,
      content,
      imageUrl: data.imageUrl,
      url: data.url,
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      authorId: userId,
      lastModifiedDate: serverTimestamp(),
      defaultLanguage: data.translations[0]?.lang || currentAppLanguage,
    };

    try {
        if (post) {
            const docRef = doc(firestore, 'blogPosts', post.id);
            const dataToUpdate = {
                ...postData,
                publicationDate: post.publicationDate, // Preserve original publication date
            }
            setDoc(docRef, dataToUpdate, { merge: true }).catch(error => {
                errorEmitter.emit('permission-error', new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'update',
                    requestResourceData: dataToUpdate,
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
    } catch (error: any) {
        // This catch block might be redundant if the .catch handlers are used,
        // but can serve as a fallback.
        console.error("An unexpected error occurred: ", error);
    } finally {
        onMutation(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[725px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{post ? translate('admin.form.editTitle') : translate('admin.form.newTitle')}</DialogTitle>
        </DialogHeader>
        <form id="blog-post-form" onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col min-h-0">
          <div className="flex-grow pr-6 -mr-6 py-4 overflow-y-auto">
              <div className="grid gap-6">
              
              <div className="space-y-4">
                  {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                      <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold">{field.lang === 'es' ? 'Español' : 'English'}</Label>
                      {fields.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                      )}
                      </div>
                      <div className="grid gap-2">
                      <Label htmlFor={`translations.${index}.title`}>{translate('admin.form.titleLabel')}</Label>
                      <Input {...register(`translations.${index}.title` as const, { required: 'Title is required' })} />
                      {errors.translations?.[index]?.title && <p className="text-red-500 text-xs">{errors.translations[index]?.title?.message}</p>}
                      </div>
                      <div className="grid gap-2">
                      <Label htmlFor={`translations.${index}.content`}>{translate('admin.form.contentLabel')}</Label>
                      <Textarea {...register(`translations.${index}.content` as const, { required: 'Content is required' })} className="min-h-[100px]" />
                      {errors.translations?.[index]?.content && <p className="text-red-500 text-xs">{errors.translations[index]?.content?.message}</p>}
                      </div>
                  </div>
                  ))}
              </div>

              {fields.length < 2 && (
                  <Button type="button" variant="outline" onClick={handleAddLanguage} className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      {translate('admin.form.addTranslationButton')}
                  </Button>
              )}

              <div className="grid grid-cols-1 gap-4 mt-6">
                  <div className="grid gap-2">
                  <Label htmlFor="imageUrl">{translate('admin.form.imageUrlLabel')}</Label>
                  <Input id="imageUrl" {...register('imageUrl', { required: 'Image URL is required' })} />
                  {errors.imageUrl && <p className="text-red-500 text-xs">{errors.imageUrl.message}</p>}
                  </div>
                  <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" {...register('url', { required: 'Post URL is required' })} />
                  {errors.url && <p className="text-red-500 text-xs">{errors.url.message}</p>}
                  </div>
              </div>
              
              <div className="grid gap-2 mt-4">
                  <Label htmlFor="tags">{translate('admin.form.tagsLabel')}</Label>
                  <Input id="tags" {...register('tags')} placeholder={translate('admin.form.tagsPlaceholder')} />
              </div>
              </div>
          </div>
          <DialogFooter className="mt-auto pt-4 border-t">
              <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isSubmitting}>{translate('admin.form.cancelButton')}</Button>
              </DialogClose>
              <Button type="submit" form="blog-post-form" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : translate('admin.form.saveButton')}
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
