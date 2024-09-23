import { loadFavorites } from '@/app/actions';

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Filter from "@/app/components/filter";
import Moview from "@/app/components/moview";

export default async function FavoritesPage({params}) {
  
  const favorites = JSON.parse( await loadFavorites(params.id));


  return (
    <div className="flex flex-col space-y-2 min-h-screen px-8 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Filter />
      <main className="w-full min-h-[80vh] h-auto">
        <div className="grid grid-cols-5 gap-8">
          {favorites &&
            favorites.map((movie, index) => {
              return <Moview key={index} movie={movie} inFavs={true} />;
            })}
        </div>
      </main>
      <Footer />
    </div>
  );
  }