package com.sparta.problem.domain;

import com.sparta.problem.dto.ObjectDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Entity
public class ObjectEntity extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String objectName;

    @Column(nullable = false)
    private String objectTitle;


    @Column(nullable = false)
    private String objectContent;

    @Column(nullable = false)
    private String objectPassword;

    public ObjectEntity(ObjectDto dto) {
        this.objectName = dto.getObjectName();
        this.objectTitle = dto.getObjectTitle();
        this.objectContent = dto.getObjectContent();
        this.objectPassword = dto.getObjectPassword();
    }

    public void update(ObjectDto dto) {
        this.objectName = dto.getObjectName();
        this.objectTitle = dto.getObjectTitle();
        this.objectContent = dto.getObjectContent();
        this.objectPassword = dto.getObjectPassword();
    }

    public ObjectEntity(String objectName, String objectContent) {
        super();
    }
}
