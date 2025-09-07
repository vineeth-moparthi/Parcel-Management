package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.User;
import com.telsusko.ParcelMangementSpringBoot.Repo.UserRepo;
import com.telsusko.ParcelMangementSpringBoot.Service.UserService;
import com.telsusko.ParcelMangementSpringBoot.dto.LoginRequest;
import com.telsusko.ParcelMangementSpringBoot.dto.RegisterationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    UserRepo userRepo;
    @PostMapping("/user")
    User registerUser(@RequestBody User user){

        if(userService.registerUser(user))
        {
            return user;
        }
        return null;
    }

    @GetMapping("/user")
    List<User> getUserDetails()
    {
        return userService.getUserDetails();
    }

    @PostMapping("/login")
    User loginUser(@RequestBody LoginRequest loginRequest){
        return userService.validateUser(loginRequest.getEmail(),loginRequest.getPassword());
    }
    @PostMapping("/registration")
    public String registerUser(@RequestBody RegisterationRequest dto) {
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            return "Password and confirm password do not match";
        }

//        if (dto.getUserId() == null || userRepo.findByUsername(dto.getUserId()) != null) {
//            return "User ID already taken or missing";
//        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setCountryCode(dto.getCountryCode());
        user.setMobile(dto.getMobile());
        user.setAddress(dto.getAddress());
        //user.setUsername(dto.getUserId());
        user.setPassword(dto.getPassword());

        userService.registerUser(user);
        return "User registered successfully";
    }

}
