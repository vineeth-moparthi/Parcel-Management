package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.User;
import com.telsusko.ParcelMangementSpringBoot.Service.UserService;
import com.telsusko.ParcelMangementSpringBoot.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
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
}
