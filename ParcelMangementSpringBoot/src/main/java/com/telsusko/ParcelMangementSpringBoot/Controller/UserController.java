package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.User;
import com.telsusko.ParcelMangementSpringBoot.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

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
}
