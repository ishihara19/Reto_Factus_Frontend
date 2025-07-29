import {Outlet} from "react-router-dom"

export default function AppLayout(){
    return(
        <div className="felx min-h-screen">
            <main className="flex-1 p4">  
                <Outlet/>
            </main>   
        </div>
    )
}