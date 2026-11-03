const onChangeHandler = (e, setState) => {
    const { name, value } = e.target;
    setState((prevData) => ({
        ...prevData,
        [name]: value
    }));
}

export default onChangeHandler;