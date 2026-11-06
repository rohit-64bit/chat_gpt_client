import { createContext, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyProfile, handleLogin, handleRegister, handleVerify } from "../apis/userApis";
import { handleCreateProject, handleDeleteProject, handleFetchProjects, handleUpdateProject } from "../apis/projectApis";
import { handleDeleteChat, handleEditChat, handleFetchChats } from "../apis/chatApis";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MainContext = createContext();

const MainProvider = ({ children }) => {

    // auth and user handlers

    const navigate = useNavigate();

    const { isAuth } = useAuthContext()

    const loginMutation = useMutation({
        mutationFn: (data) => handleLogin(data),
        onSettled: (data) => {
            console.log('Login successful:', data);
            // Handle successful login, e.g., store token, redirect, etc.
            toast.success(data.message);
            localStorage.setItem("token", data.data.token);
            navigate("/");
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Handle login error, e.g., show error message to user
        }
    })

    const registerMutation = useMutation({
        mutationFn: (data) => handleRegister(data),
        onSuccess: (data) => {

            toast.success(data.message);
            sessionStorage.setItem("token", data.data.token);
            sessionStorage.setItem("redirect", data.data.redirect);

        },
        onError: (error) => {

            toast.error(error.response.data.message);
            // Handle registration error, e.g., show error message to user
        }
    })

    const verifyMutation = useMutation({
        mutationFn: (data) => handleVerify(data),
        onSuccess: (data) => {
            console.log('Verification successful:', data);
            // Handle successful verification, e.g., redirect to home page
            localStorage.setItem("token", data.data.token);
            sessionStorage.clear();
            navigate("/");
            toast.success(data.message);
        },
        onError: (error) => {
            console.error('Verification failed:', error);
            toast.error(error.error);
            // Handle verification error, e.g., show error message to user
        }
    })

    const getUserData = useQuery({
        queryKey: ['userData'],
        queryFn: getMyProfile,
        enabled: isAuth
    })

    // project api handlers

    const createProjectMutation = useMutation({
        mutationFn: (data) => handleCreateProject(data),
        onSettled: (data) => {
            console.log('Project creation successful:', data);
            // Handle successful project creation, e.g., update project list
        },
        onError: (error) => {
            console.error('Project creation failed:', error);
            // Handle project creation error, e.g., show error message to user
        }
    })

    const fetchProjectsQuery = useQuery({
        queryKey: ['projects'],
        queryFn: handleFetchProjects,
        enabled: isAuth
    })

    const updateProjectMutation = useMutation({
        mutationFn: (data) => handleUpdateProject(data),
        onSettled: (data) => {
            console.log('Project update successful:', data);
            // Handle successful project update, e.g., update project list
        },
        onError: (error) => {
            console.error('Project update failed:', error);
            // Handle project update error, e.g., show error message to user
        }
    })

    const deleteProjectMutation = useMutation({

        mutationFn: (id) => handleDeleteProject(id),
        onSettled: (data) => {
            console.log('Project deletion successful:', data);
            // Handle successful project deletion, e.g., update project list
        },
        onError: (error) => {
            console.error('Project deletion failed:', error);
            // Handle project deletion error, e.g., show error message to user
        }

    })

    // chat api handlers

    const createChatMutation = useMutation({
        mutationFn: (data) => handleCreateChat(data),
        onSettled: (data) => {
            console.log('Chat creation successful:', data);
            // Handle successful chat creation, e.g., update chat list
        },
        onError: (error) => {
            console.error('Chat creation failed:', error);
            // Handle chat creation error, e.g., show error message to user
        }
    })

    const fetchChatsQuery = useQuery({
        queryKey: ['chats'],
        queryFn: handleFetchChats,
        enabled: isAuth
    })

    const updateChatMutation = useMutation({
        mutationFn: (data) => handleEditChat(data),
        onSettled: (data) => {
            console.log('Chat update successful:', data);
            // Handle successful chat update, e.g., update chat list
        },
        onError: (error) => {
            console.error('Chat update failed:', error);
            // Handle chat update error, e.g., show error message to user
        }
    })

    const deleteChatMutation = useMutation({
        mutationFn: (id) => handleDeleteChat(id),
        onSettled: (data) => {
            console.log('Chat deletion successful:', data);
            // Handle successful chat deletion, e.g., update chat list
        },
        onError: (error) => {
            console.error('Chat deletion failed:', error);
            // Handle chat deletion error, e.g., show error message to user
        }
    })

    return (
        <MainContext.Provider value={{ loginMutation, registerMutation, verifyMutation, getUserData, createProjectMutation, fetchProjectsQuery, updateProjectMutation, deleteProjectMutation, createChatMutation, fetchChatsQuery, updateChatMutation, deleteChatMutation }}>
            {children}
        </MainContext.Provider>
    )

}

const useMainContext = () => useContext(MainContext);

export { MainProvider, useMainContext };