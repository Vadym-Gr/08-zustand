import { Metadata } from "next";
import { getNoteById } from "@/lib/api/notes";
import { notFound } from "next/navigation";
import css from "./NoteDetails.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await getNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: note.content.substring(0, 150),
      openGraph: {
        title: note.title,
        description: note.content.substring(0, 150),
        url: `https://notehub.com/notes/${id}`,
        images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
      },
    };
  } catch {
    return { title: "Note Not Found" };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  
  const note = await getNoteById(id).catch(() => null);

  if (!note) {
    notFound();
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>{note.title}</h1>
        <span className={css.tag}>{note.tag}</span>
        <div className={css.content}>
          <p>{note.content}</p>
        </div>
      </div>
    </main>
  );
}

/*interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNoteById(params.id);

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.substring(0, 150),
    openGraph: {
      title: note.title,
      description: note.content.substring(0, 150),
      url: `https://notehub.com/notes/${params.id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NoteDetails({ params }: Props) {
  const note = await getNoteById(params.id);

  return (
    <main className={css.main}>
      <h1>{note.title}</h1>
      <span className={css.tag}>{note.tag}</span>
      <p>{note.content}</p>
    </main>
  );
}*

/*import { fetchNoteById } from '../../../lib/api';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}*/