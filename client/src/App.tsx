import { Route, Routes } from "react-router-dom"
// import PostList from "./components/b1/PostList"
import PostList from "./components/b2/PostList"
// import PostLists from "./components/b3/PostLists"
import PostLists from "./components/b4/PostLists"
import ListPost from "./components/b5/ListPost"
import FormPost from "./components/b6/FormPost"
function App() {

  return (
    <>
      {/* <PostList/> */}
      {/* <PostList/> */}
      {/* <Routes>
        <Route path="/list-post" element={<PostLists/>}/>
      </Routes> */}
      {/* <PostLists/> */}
      {/* <ListPost/> */}
      <FormPost/>
    </>
  )
}

export default App
