import React,{useState,useRef,useMemo,useCallback} from 'react';
import PropTypes from "prop-types";
function Parent(){
  const mountRef = useRef(4);
  //store the state of child component
  const [stateArr,setStateArr] = useState(new Array(mountRef.current).fill(false));
  const count = useMemo(()=>{
     return stateArr.filter(it=>it).length;
  },[stateArr])
  const handleClickChild = useCallback((i,newState)=>{
      let newStateArr = Array.from(stateArr);
      newStateArr.splice(i,1,newState);
      setStateArr(newStateArr);
  },[stateArr])
  const lis = stateArr.map((it,i)=>(<Child isOpen={it} index={i} onClick={handleClickChild}/>))
  return (
    <div className="Parent-container">
      <div className="count">
        Count:{count}
      </div>
      {lis}
    </div>
  )
}
Child.prototypes = {
  isOpen:PropTypes.bool,
  onClick:PropTypes.func,
  index:PropTypes.number
}
function Child(props){
    return (
      <div className={`singleRect ${props.isOpen?"isOpen":""}`} onClick={()=>{
        props.onClick&&props.onClick(props.index,!props.isOpen);
      }}></div>
    )
}
export default function App() {
  return (
    <Parent />
  )
}