'use client';

import { AgGridReact } from "ag-grid-react";

export default function SongsGrid() {
    return (
      <div className="ag-theme-alpine-dark CardsGrid w-full h-full flex-grow">
            <AgGridReact rowData={[]}>
                {/* <AgGridColumn field="action" headerName="" cellRenderer={"addOrRemoveRenderer"} cellRendererParams={{set: setEffected}} width={75} floatingFilter={false} filter={false}></AgGridColumn>
                <AgGridColumn field="name" headerName="Name" cellStyle={{cursor: "pointer", fontWeight: "bold", color: "#b1b100", textDecoration: "underline"}} sort={"asc"} tooltipComponent={"hoverShowCardImage"} tooltipField="name"></AgGridColumn>
                <AgGridColumn field="desc" headerName="Description" width={700} wrapText={true}></AgGridColumn>
                <AgGridColumn field="type" headerName="Type" width={150}></AgGridColumn>
                <AgGridColumn field="race" headerName="Subtype/Race" width={150}></AgGridColumn>
                <AgGridColumn field="atk" headerName="Attack" width={120}></AgGridColumn>
                <AgGridColumn field="def" headerName="Defense" width={120}></AgGridColumn>
                <AgGridColumn field="level" headerName="Level" width={120}></AgGridColumn>
                <AgGridColumn field="attribute" headerName="Attribute" width={120}></AgGridColumn> */}
            </AgGridReact>
        </div>
    )
  }
  