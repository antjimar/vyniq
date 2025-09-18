export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Vyniq</h1>
        <nav>{/* Navigation items */}</nav>
      </div>
    </header>
  );
}
