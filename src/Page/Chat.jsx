import { Box } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import Chatbox from "../Component/Chatbox";
import MyChats from "../Component/MyChats";
import SideDrawer from "../Component/miscellaneous/SideDrawer";
import  { Context } from "../Context/ContextChat";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(Context);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;