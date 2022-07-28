package com.sparta.problem.dto;

import com.sparta.problem.domain.ObjectEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ObjectDto {

    private Long id;
    private String objectName;

    private String objectTitle;

    private String objectContent;
    private String objectPassword;


    public ObjectEntity toEntitySome() {
        return new ObjectEntity(objectName, objectContent);
    }


    public ObjectEntity toEntity() {
        return new ObjectEntity(id, objectName, objectTitle,   objectContent, objectPassword);
    }
}
