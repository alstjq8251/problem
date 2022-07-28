package com.sparta.problem.service;

import com.sparta.problem.domain.ObjectEntity;
import com.sparta.problem.domain.ObjectRepository;
import com.sparta.problem.dto.ObjectDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
@Service
@Getter
@RequiredArgsConstructor
public class ObjectService {

        private final ObjectRepository objectRepository;

        @Transactional
        public  Long update(@PathVariable Long id, ObjectDto dto) {
            ObjectEntity target = objectRepository.findById(id).orElseThrow(
                    () -> new NullPointerException("해당 값이 존재하지 않습니다.")
            );
            target.update(dto);
            return id;
        }
}
