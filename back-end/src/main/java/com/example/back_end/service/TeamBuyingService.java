package com.example.back_end.service;

import com.example.back_end.dao.TeamBuyingDao;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class TeamBuyingService {

  private final TeamBuyingDao teamBuyingDao;

  public TeamBuyingService(TeamBuyingDao teamBuyingDao) {
    this.teamBuyingDao = teamBuyingDao;
  }

  public List<Map<String, Object>> getAllTeamBuyings() {
    return teamBuyingDao.getAllTeamBuyings();
  }
}
