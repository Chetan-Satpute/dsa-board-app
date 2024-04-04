import {Outlet} from 'react-router-dom';

function StructureScreen() {
  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <div className="h-1/2 w-full lg:h-full lg:w-3/5">
        <div className="p-2">
          <h1 className="m-0 text-center text-xl">DSA Board</h1>
        </div>
        <div></div>
      </div>
      <div className="flex h-1/2 w-full flex-col lg:h-full lg:w-2/5">
        <Outlet />
      </div>
    </div>
  );
}

export default StructureScreen;
