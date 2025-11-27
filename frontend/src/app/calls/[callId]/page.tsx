interface CallDetailPageProps {
  params: { callId: string };
}

export default function CallDetailPage({ params }: CallDetailPageProps) {
  return (
    <article>
      <h3 className="text-lg font-semibold">Call {params.callId}</h3>
      <p>This dynamic route will hydrate drawers/modals once real data arrives.</p>
    </article>
  );
}
