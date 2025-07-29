import './InputGroup.css'

type InputGroupProps ={
    title: string
    type: string
    value: string
    setValue: (value:string)=>void
}

function InputGroup({title,type,value,setValue} : InputGroupProps){
    return(
        
        <div className="input-group">
            <label>{title}</label>
            <input 
                type={type}
                value={value}
                onChange={(e)=>setValue(e.target.value)}
            />
            
            
        </div>
        
        
      



    )
}


export default InputGroup;
