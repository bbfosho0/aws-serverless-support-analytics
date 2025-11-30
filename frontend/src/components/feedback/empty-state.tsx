export function EmptyState({ message }: { message?: string }) {
  return (
    <div className="rounded border border-dashed p-6 text-center">
      <p className="text-muted-foreground">{message ?? "Data will appear soon."}</p>
    </div>
  );
}
