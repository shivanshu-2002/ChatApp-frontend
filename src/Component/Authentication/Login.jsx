import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      if (error.response) {
        toast({
          title: "Error Occurred!",
          description: error.response.data.message || "An error occurred while logging in.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else if (error.request) {
        toast({
          title: "Error Occurred!",
          description: "No response received from the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "Error Occurred!",
          description: "An error occurred while setting up the request.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing="10px">
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              value={email}
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Login
          </Button>
          <Button
            variant="solid"
            colorScheme="red"
            width="100%"
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            Get Guest User Credentials
          </Button>
        </VStack>
      )}
    </>
  );
};

export default Login;
