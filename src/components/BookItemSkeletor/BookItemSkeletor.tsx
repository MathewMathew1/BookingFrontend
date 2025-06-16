const BookItemSkeleton = () => {
  return (
    <div className="bg-gray-700 text-gray-400 p-4 rounded shadow-sm flex flex-col animate-pulse select-none" data-testid="skeleton">
      <div className="h-6 w-3/4 bg-gray-600 rounded mb-2"></div> 
      <div className="h-4 w-1/2 bg-gray-600 rounded mb-4"></div> 
      <div className="flex-1 bg-gray-600 rounded mb-4" style={{ minHeight: 40 }}></div> 
      <div className="h-4 w-1/3 bg-gray-600 rounded"></div> 
    </div>
  );
};

export default BookItemSkeleton;
