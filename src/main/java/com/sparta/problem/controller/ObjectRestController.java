package com.sparta.problem.controller;


import com.sparta.problem.domain.ObjectEntity;
import com.sparta.problem.domain.ObjectRepository;
import com.sparta.problem.dto.ObjectDto;
import com.sparta.problem.service.ObjectService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
public class ObjectRestController {

    private final ObjectRepository objectRepository;
    private final ObjectService objectService;

    @GetMapping("/api/objects")
    public List<ObjectEntity> objectGet() {
        return objectRepository.findAll();
    }

    @GetMapping("/api/objects/{id}")
    public ObjectEntity objectNumbGet(@PathVariable Long id) {
        ObjectEntity target = objectRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당 아이디가 없습니다.")
        );

        return target;
    }

    @PostMapping("/api/objects")
    public void articlePost(@RequestBody ObjectDto dto) {
        ObjectEntity data = dto.toEntity();
        objectRepository.save(data);
    }

    @PutMapping("/api/objects/{id}")
    public Long objectPut(@PathVariable Long id, @RequestBody ObjectDto dto) {
        objectService.update(id, dto);
        return id;
    }


    @DeleteMapping("/api/objects/{id}")
    public Long objectDelete(@PathVariable Long id) {
        ObjectEntity target = objectRepository.findById(id).orElseThrow(
                () -> new NullPointerException("삭제하려는 것이 없습니다.")
        );
        objectRepository.delete(target);
        return id;
    }
}
