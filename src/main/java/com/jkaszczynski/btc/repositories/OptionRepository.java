package com.jkaszczynski.btc.repositories;

import com.jkaszczynski.btc.entities.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionRepository extends JpaRepository<Option, Long> {
    List<Option> findAllByTopicId(Long topicId);
}
