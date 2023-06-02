package com.c1se16.otp;

import com.c1se16.otp.constant.OtpStatus;
import com.c1se16.otp.constant.OtpType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {

    @Query("SELECT o FROM Otp o WHERE o.type = ?1 AND o.parent = ?2")
    List<Otp> findByTypeAndParent(OtpType type, String parent);

    @Query("SELECT o FROM Otp o WHERE o.type = ?1 AND o.parent = ?2 AND o.status NOT IN ?3")
    Optional<Otp> findByTypeAndParentAndNotStatus(OtpType type, String parent, List<OtpStatus> statuses);
}