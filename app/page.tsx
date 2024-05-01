import Search from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="px-5 pt-6">
        <Header />
        <Search />

        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza."
          width={0}
          height={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
    </>
  );
};

export default Home;
