import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/notes';

import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Notes filtered by ${tag} | NoteHub`,
    description: `All your notes with tag ${tag} in one place.`,
    openGraph: {
      title: `Filter: ${tag}`,
      description: `View all notes categorized as ${tag}`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];

  return <NotesClient tag={tag} />;
}

/*export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ tag: tag === 'all' ? undefined : tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}*/
