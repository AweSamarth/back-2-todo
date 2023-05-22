
import { hehe } from "~/utils/api";


export const Card = (props:any)=>{
    const todo =hehe.another.getAllOfOne.useQuery("awesamarth")
    const delMutation = hehe.another.deleteThat.useMutation()

    const handleDelMutation = async(id:number)=>{

        try {
            delMutation.mutate(id)
            console.log("done that")
            
        } catch (error) {
            console.error(error)
        }
    }




    return(
        <div className="card  bg-base-100">
        <div className="">
          <button onClick={props.deleter} className="btn-square btn-sm btn m-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="card-body -mt-2">
          <p>{props.data}</p>
          <div className="card-actions justify-end">
            <button className="btn-primary btn">Done</button>
          </div>
        </div>
      </div>
    )
}