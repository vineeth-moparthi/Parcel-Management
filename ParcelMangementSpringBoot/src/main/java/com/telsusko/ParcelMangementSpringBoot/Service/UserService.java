package com.telsusko.ParcelMangementSpringBoot.Service;

import com.telsusko.ParcelMangementSpringBoot.Model.User;
import com.telsusko.ParcelMangementSpringBoot.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public boolean registerUser(User user) {
        if(userRepo.findByEmail(user.getEmail())!=null)
        {
            return false;
        }
        userRepo.save(user);

        return true;
    }

    public User validateUser(String Email, String PassWord)
    {
        if(userRepo.findByEmailAndPassword(Email,PassWord)==null)
        {
            return null;
        }
        return  userRepo.findByEmailAndPassword(Email,PassWord);
    }

    public List<User> getUserDetails() {
        return userRepo.findAll();
    }

    public User getUserDetailsById(long userId) {
        User user=userRepo.findById(userId).orElse(null);
        return user;
    }
}
