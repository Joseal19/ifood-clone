import Search  from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";

const Home = () => {
  return (
   <>
    <div className="px-5 pt-6">
      <Header />
      <Search />

      <CategoryList/>
    </div>
   </>
  )
}


export default Home;