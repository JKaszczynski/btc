package com.jkaszczynski.btc.repositories;

import com.jkaszczynski.btc.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}
