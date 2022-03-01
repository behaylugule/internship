const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    fullname:req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    phone:req.body.phone,
    gender:req.body.gender,
    address:req.body.address,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.user_name,
                isAdmin:true  
            }
        );
        if(!user){
            return res.status(401).json("Wrong User Name");
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password;
        if(originalPassword != inputPassword){
            return res.status(401).json("Wrong Password");
        } 
            
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC
        );
  
        const { password, ...others } = user._doc;  
       return res.status(200).json({...others, accessToken});

    }catch(err){
        
        return res.status(500).json(err);
    }

});

router.post('/loginuser', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.user_name,
                isAdmin:false
            }
        );
        if(!user){
            return res.status(401).json("Wrong User Name");
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password;
        if(originalPassword != inputPassword){
           return res.status(401).json("Wrong Password");
        } 
           
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC
        );
        const { password, ...others } = user._doc;  
        return res.status(200).json({...others, accessToken});
    }catch(err){
        console.log(err)
        return res.status(500).json(err);
    }
});


router.post('/forgetpassword', async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(user===null) return res.status(404).json("user not found with this email")
        sgMail.setApiKey('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');
        await sgMail.send({
            to: req.body.email,
            from: 'behaylugule@gmail.com', // Use the email address or domain you verified above
            subject: 'Password Reset Link',
            text: 'Click the link to reset the password',
            html: '<strong>Click the link to reset the password <a>http://localhost:3000/passwordreset</a></strong>',
            });
        res.status(200).json("chack your email please!!!")
    }catch(err){
        console.log(err)
        return res.status(500).json(err);
    }
});

module.exports = router;
