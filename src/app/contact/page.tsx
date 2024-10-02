"use client"
import React, { useEffect, useState } from 'react';
import { useForm} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';


const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address'),
  question: z.string().min(10, 'Question must be at least 10 characters'),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      question: '',
    },
  });

  const handleSubmit = (data: { name: string; email: string; question: string }) => {
    toast({
      title: 'Question Submitted',
      description: 'We will get back to you soon',
    });
    console.log('Submitted', data);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-600'>
      <h1 className='text-white text-4xl font-bold mb-8'>Contact Us</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-6 bg-slate-700 p-8 rounded-lg shadow-lg'>
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-bold text-lg mb-2'>Name</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type='text'
                  className='w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Your Name'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-bold text-lg mb-2'>Email</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type='email'
                  className='w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Your Email'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )} />
          <FormField control={form.control} name="question" render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-bold text-lg mb-2'>Question</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className='w-full p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32'
                  placeholder='Your Question'
                ></textarea>
              </FormControl>
              <FormMessage>{form.formState.errors.question?.message}</FormMessage>
            </FormItem>
          )} />
          <Button type='submit' className='w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
