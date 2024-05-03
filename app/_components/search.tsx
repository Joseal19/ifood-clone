import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
const Search = () => {
  return (
    <div className="flex gap-4">
      <Input placeholder="Buscar restaurante" className="border-none bg-[#F4F4F4F4]" />
      <Button size="icon" className="bg-[#EA1D2C]">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
