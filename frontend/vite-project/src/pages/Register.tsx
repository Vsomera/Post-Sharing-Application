import { MdOutlineNavigateNext } from 'react-icons/md'
import { useEffect, useState } from "react"

import { motion } from "framer-motion"


const Register = () => {

    const [toggleSubmit, setSubmit] = useState(false) // shows submit button if true
    const [animateSubmit, setAniSubmit] = useState(false) // animates submit btn

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")

    useEffect(() => {
        if (username && email && password && confPassword !== "") {
            setSubmit(true)
        } else {
            setSubmit(false)
        }
    }, [username, email, password, confPassword])


    return (
        <>
            <div className="registration">
                <div className="register-container">

                    <div className="auth-title">
                        <h1>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.2 }}
                            >R</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.3 }}
                            >e</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.4 }}
                            >g</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.5 }}
                            >i</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.6 }}
                            >s</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.7 }}
                            >t</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.8 }}
                            >r</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 0.9 }}
                            >a</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 1 }}
                            >t</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 1.1 }}
                            >i</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 1.2 }}
                            >o</motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: 3, delay: 1.3 }}
                            >n</motion.div>

                            <motion.p
                                onMouseEnter={() => setAniSubmit(true)}
                                onMouseLeave={() => setAniSubmit(false)}
                                initial={{
                                    opacity: toggleSubmit ? 0 : 1,
                                    y: 85
                                }}
                                animate={{
                                    x: toggleSubmit ? [0, 260] : [260, 0],
                                    opacity: toggleSubmit ? 1 : 0
                                }}
                                transition={{
                                    duration: username || email || password || confPassword ? 0.3 : 0
                                }}
                            >

                                <motion.div>S</motion.div>
                                <motion.div>i</motion.div>
                                <motion.div>g</motion.div>
                                <motion.div>n</motion.div>
                                <motion.div>-</motion.div>
                                <motion.div>I</motion.div>
                                <motion.div>n</motion.div>


                                <motion.div
                                    animate={{ x: animateSubmit ? 5 : 0 }}
                                    // green arrow after sign-in
                                > <MdOutlineNavigateNext className="icon" />
                                </motion.div>

                            </motion.p>

                        </h1>
                    </div>

                    {/* Input Boxes */}
                    <div className="auth-container">

                        <motion.div
                            animate={{ opacity: [0, 0.2, 0.4, 0.6, 0.8 , 1], x: [80, 0] }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="auth-input">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                            <span>U s e r n a m e</span>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: [0, 0.2, 0.4, 0.6, 0.8 , 1], x: [80, 0] }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="auth-input">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <span>E m a i l</span>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: [0, 0.2, 0.4, 0.6, 0.8 , 1], x: [80, 0] }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="auth-input" >
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <span>P a s s w o r d</span>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: [0, 0.2, 0.4, 0.6, 0.8 , 1], x: [80, 0] }}
                            transition={{ duration: 1, delay: 0.9 }}
                            className="auth-input" >
                            <input
                                type="password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                required />
                            <span>C O N F I R M - P a s s w o r d</span>
                        </motion.div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Register