package com.c1se16.otp;

import com.c1se16.otp.constant.OtpStatus;
import com.c1se16.otp.constant.OtpType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "otp")
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "value", columnDefinition = "longtext")
    private String value;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expire")
    private Date expire;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "issue_date", updatable = false)
    @CreationTimestamp
    private Date issueDate;

    @Column(name = "parent")
    private String parent;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private OtpType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OtpStatus status;
}
