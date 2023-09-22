
const User = require("../model/userM"); // Import the User model
const jwt = require('jsonwebtoken'); // Import the jwt module
const {hashPassword,comparePassword} = require('../utility/hash')

exports.register = async (req, res) => {
  try {
      // 1. destructure name, email, password from req.body
      const { name, email, password } = req.body;
      // 2. all fields require validation
      if (!name.trim()) {
          return res.json({ error: "Name is required" });
      }
      if (!email) {
          return res.json({ error: "Email is required" });
      }
      if (!password || password.length < 6) {
          return res.json({ error: "Password must be at least 6 characters long" });
      }
      // 3. check if email is taken
      const existingUser = await User.findOne({ email });
    
      if (existingUser) {
          return res.json({ error: "Email is taken" });
      }
      // 4. hash password
      const hssPassword = await hashPassword(password);
      // 5. register user    
      const user = await new User({
          name,
          email,
          password: hssPassword,
          
      }).save();
     
      // 6. create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
      });



      // 7. send response
      res.json({
          user: {
              name: user.name,
              email: user.email,
              password: user.password,
              role: user.role,
              address: user.address,
          },
          token,
      });
  } catch (err) {
      console.log(err);
  }
};


exports.login = async (req,res) => {
  try {
    const {email,password} = req.body;
    if (!email) {
      return res.json ({
        error : "email required"
      })
    }

    if(!password || password < 6) {
           return res.json ({error : "must 8 word"})
    }

    const user = await User.findOne({email});


    if(!user) {

      return res.json ({error : " user not found"})
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.json({ error: "Invalid email or password" });
  }


    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
  });

          // 7. send response
          res.json({
            user: {
                _id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });





  } catch (error) {
    
  }
}



exports.secret = async (req, res) => {
  console.log(req.user);
  res.json({
      currentUser: req.user,
      message: "admin successfully entered in the controller"
  });
};




exports.updateProfile = async (req,res) => {
try {
  const {name,password} = req.body;

  const user = await User.findById(req.body._id);

if (password && password.length < 6) {
  return res.json ({error : "password must be 6 upper"})
}

const hashedPassword = password ? await hashPassword(password) : undefined;



const update = await User.findByIdAndUpdate (
  req.user._id,

  {
    name: name || user.name,
    password : hashedPassword || user.password
    // address : address || user.address,
     
  },
)

update.password = undefined;
update.role = undefined;
res.json(update)

} catch (error) {
    console.log(error)
}
}

exports.getUsers = async (req,res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        console.log(error)
    }
}