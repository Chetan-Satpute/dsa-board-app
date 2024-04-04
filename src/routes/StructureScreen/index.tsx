import {Outlet} from 'react-router-dom';

function StructureScreen() {
  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row">
      <div className="w-full h-1/2 lg:w-3/5 lg:h-full">
        <div className="p-2">
          <h1 className="text-xl m-0 text-center">DSA Board</h1>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col w-full h-1/2 lg:w-2/5 lg:h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default StructureScreen;
