"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BlogPost,
  CreateBlogPostDto,
  LocalizedString,
  UpdateBlogPostDto,
} from "@/lib/types";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { createBlogPost, updateBlogPost } from "@/services/blog_service";
import { useFirestore } from "@/firebase";
import { useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import {
  BlogPostFormData,
  BlogFormDialogProps,
  TranslationField,
} from "./props/blog-form-dialog.props";

export function BlogFormDialog({
  isOpen,
  onClose,
  post,
  userId,
  onMutation,
}: BlogFormDialogProps) {
  const firestore = useFirestore();
  const { language: currentAppLanguage, translate } = useLanguage();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormData>({
    defaultValues: {
      translations: [{ lang: currentAppLanguage, title: "", content: "" }],
      imageUrl: "",
      url: "",
      tags: "",
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "translations",
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!post) {
      const defaultTranslation = [
        { lang: currentAppLanguage, title: "", content: "" },
      ];
      replace(defaultTranslation);
      reset({
        imageUrl: "",
        url: "",
        tags: "",
        translations: defaultTranslation,
      });
      return;
    }

    const postTranslations: TranslationField[] = Object.keys(post.title).map(
      (lang) => ({
        lang,
        title: post.title[lang],
        content: post.content[lang],
      })
    );
    replace(postTranslations);
    reset({
      imageUrl: post.imageUrl,
      url: post.url,
      tags: post.tags.join(", "),
      translations: postTranslations,
    });
  }, [post, isOpen, reset, currentAppLanguage, replace]);

  const handleAddLanguage = () => {
    const existingLangs = fields.map((f) => f.lang);
    if (!existingLangs.includes("en") && "en" !== currentAppLanguage) {
      append({ lang: "en", title: "", content: "" });
    } else if (!existingLangs.includes("es") && "es" !== currentAppLanguage) {
      append({ lang: "es", title: "", content: "" });
    }
  };

  const onSubmit: SubmitHandler<BlogPostFormData> = async (data) => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: translate("admin.toast.authError.title") as string,
        description: translate("admin.toast.authError.description") as string,
      });
      return;
    }

    onMutation(true);

    const title: LocalizedString = {};
    const content: LocalizedString = {};
    data.translations.forEach((translation) => {
      title[translation.lang] = translation.title;
      content[translation.lang] = translation.content;
    });

    try {
      if (post) {
        const updateBlogPostDto: UpdateBlogPostDto = {
          title,
          content,
          imageUrl: data.imageUrl,
          url: data.url,
          tags: data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          defaultLanguage: data.translations[0]?.lang || currentAppLanguage,
        };
        await updateBlogPost(post.id, updateBlogPostDto);
        toast({
          className: "bg-green-500 text-white",
          title: translate("admin.toast.updateSuccess.title") as string,
          description: translate(
            "admin.toast.updateSuccess.description"
          ) as string,
        });
        onClose();
        return;
      }

      const createBlogPostDto: CreateBlogPostDto = {
        title,
        content,
        imageUrl: data.imageUrl,
        url: data.url,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        defaultLanguage: data.translations[0]?.lang || currentAppLanguage,
      };
      await createBlogPost(createBlogPostDto);
      toast({
        className: "bg-green-500 text-white",
        title: translate("admin.toast.createSuccess.title") as string,
        description: translate(
          "admin.toast.createSuccess.description"
        ) as string,
      });
      onClose();
    } catch (error: any) {
      console.error("An unexpected error occurred: ", error);
      toast({
        variant: "destructive",
        title: translate("admin.toast.unexpectedError.title") as string,
        description: translate(
          "admin.toast.unexpectedError.description"
        ) as string,
      });
    } finally {
      onMutation(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[725px] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {post
              ? (translate("admin.form.editTitle") as string)
              : (translate("admin.form.newTitle") as string)}
          </DialogTitle>
        </DialogHeader>
        <form
          id="blog-post-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow flex flex-col min-h-0"
        >
          <ScrollArea className="flex-grow pr-6 -mr-6 overflow-y-auto">
            <div className="grid gap-6">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg space-y-4 relative"
                  >
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold">
                        {field.lang === "es" ? "Español" : "English"}
                      </Label>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`translations.${index}.title`}>
                        {translate("admin.form.titleLabel") as string}
                      </Label>
                      <Input
                        {...register(`translations.${index}.title` as const, {
                          required: translate(
                            "admin.form.validation.titleRequired"
                          ) as string,
                        })}
                      />
                      {errors.translations?.[index]?.title && (
                        <p className="text-red-500 text-xs">
                          {errors.translations[index]?.title?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`translations.${index}.content`}>
                        {translate("admin.form.contentLabel") as string}
                      </Label>
                      <Textarea
                        {...register(`translations.${index}.content` as const, {
                          required: translate(
                            "admin.form.validation.contentRequired"
                          ) as string,
                        })}
                        className="min-h-[100px]"
                      />
                      {errors.translations?.[index]?.content && (
                        <p className="text-red-500 text-xs">
                          {errors.translations[index]?.content?.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {fields.length < 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddLanguage}
                  className="w-full"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {translate("admin.form.addTranslationButton") as string}
                </Button>
              )}

              <div className="grid gap-4 mt-6">
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">
                    {translate("admin.form.imageUrlLabel") as string}
                  </Label>
                  <Input
                    id="imageUrl"
                    {...register("imageUrl", {
                      required: translate(
                        "admin.form.validation.imageUrlRequired"
                      ) as string,
                    })}
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500 text-xs">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    {...register("url", {
                      required: translate(
                        "admin.form.validation.urlRequired"
                      ) as string,
                    })}
                  />
                  {errors.url && (
                    <p className="text-red-500 text-xs">{errors.url.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2 mt-4">
                <Label htmlFor="tags">
                  {translate("admin.form.tagsLabel") as string}
                </Label>
                <Input
                  id="tags"
                  {...register("tags")}
                  placeholder={
                    translate("admin.form.tagsPlaceholder") as string
                  }
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-auto pt-4 border-t">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isSubmitting}>
                {translate("admin.form.cancelButton") as string}
              </Button>
            </DialogClose>
            <Button type="submit" form="blog-post-form" disabled={isSubmitting}>
              {isSubmitting
                ? (translate("admin.form.savingButton") as string)
                : (translate("admin.form.saveButton") as string)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
