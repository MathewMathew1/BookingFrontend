import SearchPanel from "../../components/SearchPanel/SearchPanel";
import VolumeList from "../../components/VolumeList/VolumeList";
import { useVolumesSearch } from "../../hooks/useVolumeSearch";


const Main = () => {
  const { volumes, loading, handleSearch, handleFetchMore } =
    useVolumesSearch();

  return (
    <div className="sm:p-4 w-full mx-auto">
      <SearchPanel onSearch={handleSearch} loading={loading} />
      <VolumeList loading={loading} volumes={volumes} fetchMore={handleFetchMore} />
    </div>
  );
};

export default Main;
