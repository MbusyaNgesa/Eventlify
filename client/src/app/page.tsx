import { CardGrid } from "./components/cardGrid";
import { GenreAnimation } from "./components/genreAnimation";
import { Hero } from "./components/hero";
import { MemoryCalendar } from "./components/memoryCalendar";
import { Navigation } from "./components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6 space-y-8">
        <Hero />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming</h2>
          <CardGrid />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Moments</h2>
          <MemoryCalendar />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Genres</h2>
          <GenreAnimation />
        </section>
      </main>
    </div>
  );
}
