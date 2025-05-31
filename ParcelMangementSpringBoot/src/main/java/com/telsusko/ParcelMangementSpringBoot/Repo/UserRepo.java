package com.telsusko.ParcelMangementSpringBoot.Repo;

import com.telsusko.ParcelMangementSpringBoot.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    User findByEmail(String email);
    User findByEmailAndPassword(String email, String password);
}
