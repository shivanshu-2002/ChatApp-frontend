import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState('');
  const toast = useToast();
  const [submitLoader, setSubmitLoader] = useState(false);

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setSubmitLoader(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Password and Confirm Password do not match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setSubmitLoader(false);
      return;
    }
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg']; // Add more formats if needed
    if (!allowedFormats.includes(pic.type)) {
      toast({
        title: 'Invalid Image Format',
        description: 'Please upload an image in PNG, JPEG, or JPG format only.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setSubmitLoader(false);
      return;
    }
    try {
      setSubmitLoader(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      };
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('pic', pic);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/signup",
        formData,
        config
      );
      console.log(data);
      setSubmitLoader(false);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/')
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting the form. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setSubmitLoader(false);
  };

  return (
    <>
      {
        submitLoader ? <Spinner /> : <VStack spacing="5px">
          <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="Confirm_password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => setPic(e.target.files[0])} // Use e.target.files[0]
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Sign Up
          </Button>
        </VStack>
      }
    </>


  );
};

export default Signup;