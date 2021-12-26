package tech.airacoon.visualgo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.airacoon.visualgo.dao.AccountDao;
// import tech.airacoon.visualgo.dao.FileDao;
import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.AccountView;
import tech.airacoon.visualgo.pojo.Role;
import tech.airacoon.visualgo.service.AccountService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 账户的service的实现
 */
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountDao accountDao;

    @Override
    public List<Role> getRoles() {
        return accountDao.getRoles();
    }

    @Override
    public AccountView getAccountByEmail(String email) {
        return accountDao.getAccountByEmail(email);
    }

    @Override
    public AccountView getAccountById(Integer id) {
        return accountDao.getAccountById(id);
    }

    @Override
    public AccountView getAccountByName(String name) {
        return accountDao.getAccountByName(name);
    }

    /**
     * @param account
     * @return
     */
    @Override
    @Transactional(timeout = 3600)
    public Integer regAccount(Account account) {
        return accountDao.regAccount(account);
    }

    @Override
    @Transactional(timeout = 3600)
    public Integer updateAccountInfoByEmail(Account account) {
        return accountDao.updateAccountInfoByEmail(account);
    }

    @Override
    @Transactional(timeout = 3600)
    public Integer updatePassword(Account account) {
        return accountDao.updatePassword(account);
    }

    @Override
    public List<AccountView> getAllAccounts(Account account) {
        return accountDao.getAllAccounts(account);
    }

    @Override
    public Integer updateAccountInfoById(Account account) {
        return accountDao.updateAccountInfoById(account);
    }
}
